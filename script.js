let copyBtn1 = document.querySelector('#copy1')
let copyBtn2 = document.querySelector('#copy2')

copyBtn1.addEventListener('click', copyHandler);
copyBtn2.addEventListener('click', copyHandler);

function copyHandler(){
    text = '1x23456';
    if (window.clipboardData && window.clipboardData.setData) {
      // IE: prevent textarea being shown while dialog is visible
      return window.clipboardData.setData("Text", text);
  
    } else if (document.queryCommandSupported && 
               document.queryCommandSupported("copy")) {
      var textarea = document.createElement("textarea");
      textarea.textContent = text;
      // Prevent scrolling to bottom of page in MS Edge
      textarea.style.position = "fixed";
      document.body.appendChild(textarea);
      textarea.select();
      try {
        // Security exception may be thrown by some browsers
        return document.execCommand("copy");
      } catch (ex) {
        console.warn("Copy to clipboard failed.", ex);
        return false;
      } finally {
        document.body.removeChild(textarea);
      }
    }
}

const ethereumButton = document.querySelector('#enableEthereumButton');

ethereumButton.addEventListener('click', () => {
  //Will Start the metamask extension
  ethereum.request({ method: 'eth_requestAccounts' });
  addAsset();
});

async function addAsset(){
    try {
        await ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x38' }],   // BCS CHAIN
        });
      } catch (switchError) {
        // This error code indicates that the chain has not been added to MetaMask.
        if (switchError.code === 4902) {
          try {
            await ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainId: '0x38',
                  chainName: 'Smart Chain',
                  rpcUrls: ['https://bsc-dataseed.binance.org/'] /* ... */,
                },
              ],
            });
          } catch (addError) {
            // handle "add" error
          }
        }
        // handle other "switch" errors
      }
      const tokenAddress = '0x62538B75606f08c1cac2C543DB9D6500d351624E';
      const tokenSymbol = 'CPBC';
      const tokenDecimals = 18;
      const tokenImage = 'https://capybaracoin.online/token_logo.png';
    
      try {
      // wasAdded is a boolean. Like any RPC method, an error may be thrown.
      const wasAdded = await ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20', // Initially only supports ERC20, but eventually more!
          options: {
            address: tokenAddress, // The address that the token is at.
            symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
            decimals: tokenDecimals, // The number of decimals in the token
            image: tokenImage, // A string url of the token logo
          },
        },
      });
    
      if (wasAdded) {
        console.log('Thanks for your interest!');
      } else {
        console.log('Your loss!');
      }
      } catch (error) {
      console.log(error);
    }
}