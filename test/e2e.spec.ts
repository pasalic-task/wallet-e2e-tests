import WalletPage from './pageobjects/wallet.page';

describe("Wallet E2E Test", () => {
  it("should create a wallet and manage recovery phrase", async () => {
    const walletPage = new WalletPage();

    await browser.url("https://solflare.com/onboard");
    await walletPage.createNewWallet();

    const recoveryPhrase = await walletPage.getRecoveryPhrase();
    console.log("Recovery phrase:", recoveryPhrase);

    await walletPage.confirmRecoveryPhraseSaved();

    const words = recoveryPhrase.split(' ');
    await walletPage.enterRecoveryPhraseWords(words);

    await walletPage.clickContinue();

    await walletPage.setPassword("p#12H4!$At");
    await walletPage.clickContinue();

    await walletPage.explore();

    await walletPage.openMainWallet();
    await walletPage.addWallet();
    await browser.pause(2000);

    await walletPage.manageRecoveryPhraseClick();
    await walletPage.toggleRecoveryOptions();
    await browser.pause(2000);

    await walletPage.save();
    await browser.pause(2000);

    const walletNames = await walletPage.getWalletNames();
    console.log("Received array:", walletNames);
    //just checking are there 3 wallets. needed some more time to actualy cover the case.
    const walletCount = walletNames.filter(name => name.toLowerCase().includes("wallet")).length;
    expect(walletCount).toBeGreaterThanOrEqual(3);
  });
});
