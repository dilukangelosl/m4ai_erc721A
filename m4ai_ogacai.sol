// SPDX-License-Identifier: MIT

pragma solidity >=0.8.17;

import "https://github.com/chiru-labs/ERC721A/blob/main/contracts/ERC721A.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts-upgradeable/utils/StringsUpgradeable.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract M4AI_OGACAI is ERC721A, Ownable {
    IERC721 private ogac = IERC721(0xA83ad73eEd496fcD7adc5F4027CbAD818D0075a0);
    IERC721 private m4 = IERC721(0x68EA301ECc143C239e354a632FDb6fa1D08dA8D9);

    using StringsUpgradeable for uint256;
    address externalContract;
    address private partnerAddr =
        address(0x4fdc1E3a6c0243a089D80E90D7bd0e060044E267);
    address public crossmintAddress;
    string public baseApiURI;

    uint256 public cost = 0.018 ether;
    uint256 public maxSupply = 500;
    uint16 public maxMintAmountPerTransaction = 20;
    //used to pause the contract
    bool public paused = false;

    constructor(string memory _baseUrl)
        ERC721A("M4AI/OGACAI AI collection", "M4OGACAI")
    {
        baseApiURI = _baseUrl;
    }

    //This function will be used to extend the project with more capabilities
    function setExternalContract(address _bAddress) public onlyOwner {
        externalContract = _bAddress;
    }

    //this function can be called only from the extending contract
    function mintExternal(address _address, uint256 _mintAmount) external {
        require(
            msg.sender == externalContract,
            "Sorry you dont have permission to mint"
        );
        _safeMint(_address, _mintAmount);
    }

    function numberMinted(address owner) public view returns (uint256) {
        return _numberMinted(owner);
    }

    function mint(uint256 _mintAmount) external payable {
        if (msg.sender != owner()) {
            require(
                !paused ||
                    (!paused &&
                        (ogac.balanceOf(msg.sender) > 0 ||
                            (m4.balanceOf(msg.sender) > 0))),
                "Only M4 and OGAC Holders May Mint Now."
            );
            require(_mintAmount > 0, "Mint amount should be greater than 0");
            require(
                _mintAmount <= maxMintAmountPerTransaction,
                "Sorry you cant mint this amount at once"
            );
            require(
                totalSupply() + _mintAmount <= maxSupply,
                "Exceeds Max Supply"
            );
            require(msg.value >= cost * _mintAmount, "Insuffient funds");
        }

        _safeMint(msg.sender, _mintAmount);
    }

    function crossmint(address _to, uint256 _mintAmount) public payable {
        require(
            !paused ||
                (!paused &&
                    (ogac.balanceOf(_to) > 0 || (m4.balanceOf(_to) > 0))),
            "Only M4 and OGAC Holders May Mint Now."
        );
        require(_mintAmount > 0, "Mint amount should be greater than 0");
        require(
            _mintAmount <= maxMintAmountPerTransaction,
            "Sorry you cant mint this amount at once"
        );
        require(totalSupply() + _mintAmount <= maxSupply, "Exceeds Max Supply");
        require(msg.value >= cost * _mintAmount, "Incorrect value sent");

        // NOTE THAT the address is different for ethereum, polygon, and mumbai
        // ethereum (all)  = 0xdab1a1854214684ace522439684a145e62505233
        // polygon mainnet = 0x12A80DAEaf8E7D646c4adfc4B107A2f1414E2002
        // polygon mumbai  = 0xDa30ee0788276c093e686780C25f6C9431027234
        require(
            msg.sender == crossmintAddress,
            "This function is for Crossmint only."
        );
        _safeMint(_to, _mintAmount);
    }

     function _baseURI() internal view virtual override returns (string memory) {
        return baseApiURI;
    }

    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );
        string memory currentBaseURI = _baseURI();
        return
            bytes(currentBaseURI).length > 0
                ? string(abi.encodePacked(currentBaseURI, tokenId.toString()))
                : "";
    }

    function setCost(uint256 _newCost) public onlyOwner {
        cost = _newCost;
    }

    function setmaxMintAmountPerTransaction(uint16 _amount) public onlyOwner {
        maxMintAmountPerTransaction = _amount;
    }

    function setMaxSupply(uint256 _supply) public onlyOwner {
        maxSupply = _supply;
    }

    function setBaseURI(string memory _newBaseURI) public onlyOwner {
        baseApiURI = _newBaseURI;
    }

    function togglePause() public onlyOwner {
        paused = !paused;
    }

    modifier onlyOwnerOrPartner() {
        require(msg.sender == owner() || msg.sender == partnerAddr);
        _;
    }

    function setCrossmintAddress(address _crossmintAddress) public onlyOwner {
        crossmintAddress = _crossmintAddress;
    }

    function withdraw() public onlyOwnerOrPartner {
        // This will pass 50% of the initial sale to partner
        (bool hs, ) = payable(partnerAddr).call{
            value: (address(this).balance * 50) / 100
        }("");
        require(hs);
        // This will transfer the remaining contract balance to the owner.
        (bool os, ) = payable(owner()).call{value: address(this).balance}("");
        require(os);
    }
}
