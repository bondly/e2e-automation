const { getSynpressPath } = require("@synthetixio/synpress/helpers");

describe('Unstaking e2e Test', () => {

    it('Connects with Metamask', () => {
        cy.clearLocalStorage();
	    cy.visit("https://bswap-staging.vercel.app");
        cy.contains('Connect Wallet').click();
        cy.contains('Login with Metamask').click();
        cy.acceptMetamaskAccess().should("be.true");
    })
    it('Unstake some Bondly tokens', () => {
        cy.switchToCypressWindow();
        cy.wait(10000);
        cy.contains('Unstake').click();
        cy.get('#page-content > div > div > div.sc-lbeWMy.rtpjz > div.sc-bbMrut.wEnNs > div.sc-bsVkav.jivxVW > div > div.sc-ewkqZ.gdOKCp > div.stake-input > input[type=text]').type('100');
        cy.get('#page-content > div > div > div.sc-lbeWMy.rtpjz > div.sc-bbMrut.wEnNs > div.sc-bsVkav.jivxVW > div > div.sc-ewkqZ.gdOKCp > div.sc-gsnTZi.dRsHiZ > span').click();
        cy.confirmMetamaskTransaction();
        cy.get('#page-content > div > div > div.sc-hWlEnr.ehFUWm > div', { timeout: 70000 }).should(($el) => {
            expect(Cypress.dom.isAttached($el), 'is attached').to.eq(false);
        });
        cy.get('#root > div.sc-ezWOiH.fvyNFh > div', {timeout: 50000}).should('not.be.visible');
        cy.disconnectMetamaskWalletFromDapp();
        cy.resetMetamaskAccount();
        //cy.wait(10000);
        //cy.contains('...').should('be.visible');
    })
  })