class WalletPage  {
  get newWalletButton() { return $('//span[text()="I need a new wallet"]'); }
  get recoveryInputs() { return $$('[data-testid^="input-recovery-phrase-"]'); }
  get savedButton() { return $('//span[text()="I saved my recovery phrase"]'); }
  get continueButton() { return $('[data-testid="btn-continue"]'); }
  get newPasswordInput() { return $('[data-testid="input-new-password"]'); }
  get repeatPasswordInput() { return $('[data-testid="input-repeat-password"]'); }
  get exploreButton() { return $('[data-testid="btn-explore"]'); }
  get mwSpan() { return $('//span[text()="MW"]'); }
  get addWalletButton() { return $('//span[text()="add"]'); }
  get manageRecoveryPhrase() { return $('[data-testid="list-item-m-title"]*=Manage recovery phrase'); }
  get toggles() { return $$('button[role="switch"]'); }
  get saveButton() { return $('[data-testid="btn-save"]'); }
  get walletNamesElements() { return $$('[data-testid="list-item-m-title"]'); }

  async createNewWallet() {
    await this.newWalletButton.click();
  }

  async getRecoveryPhrase() {
    const words = [];
    for (const input of await this.recoveryInputs) {
      words.push(await input.getValue());
    }
    return words.join(' ');
  }

  async confirmRecoveryPhraseSaved() {
    await this.savedButton.click();
  }

  async enterRecoveryPhraseWords(words: string[]) {
    for (const word of words) {
      await browser.keys(word);
      await browser.keys('Tab');
      await browser.pause(200);
    }
  }

  async setPassword(password: string) {
    await this.newPasswordInput.click();
    await this.newPasswordInput.setValue(password);
    await this.repeatPasswordInput.click();
    await this.repeatPasswordInput.setValue(password);
  }

  async clickContinue() {
    await this.continueButton.click();
  }

  async explore() {
    await this.exploreButton.click();
  }

  async openMainWallet() {
    await this.mwSpan.waitForExist({ timeout: 5000 });
    await this.mwSpan.click();
  }

  async addWallet() {
    await this.addWalletButton.waitForDisplayed({ timeout: 5000 });
    await this.addWalletButton.click();
  }

  async manageRecoveryPhraseClick() {
    await this.manageRecoveryPhrase.waitForClickable({ timeout: 5000 });
    await this.manageRecoveryPhrase.click();
  }

  async toggleRecoveryOptions() {
    const toggles = await this.toggles;
    const firstToggle = toggles[0];
    await firstToggle.waitForExist({ timeout: 8000 });
    await expect(firstToggle).toHaveAttribute('aria-checked', 'true');

    for (const index of [2, 3]) {
      const toggle = toggles[index];
      const span = await toggle.$('span');
      const dataState = await span.getAttribute('data-state');
      if (dataState === 'unchecked') {
        await toggle.click();
        await browser.waitUntil(
          async () => (await span.getAttribute('data-state')) === 'checked',
          { timeout: 5000, timeoutMsg: `Toggle ${index + 1} nije prebačen u checked stanje` }
        );
      }
    }
  }

  async save() {
    await this.saveButton.waitForClickable({ timeout: 5000 });
    await this.saveButton.click();
  }

  async getWalletNames() {
    const walletNamesElements = await this.walletNamesElements;
    const walletNames = [];
    for (const el of walletNamesElements) {
      walletNames.push(await el.getText());
    }
    return walletNames;
  }
  
}
export default WalletPage;
