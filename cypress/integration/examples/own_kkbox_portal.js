context('Portal Test', () => {
  beforeEach(() => {
  	// demo1938@kkbox.com
    cy.setCookie('token', 'V0006HMw705000000581410001U2r1z01BiDpAbED0K335PoQDS001S-oJu9195', {path: '/', domain: 'portal.kkbox.com'})
      .visit('https://portal.kkbox.com/listen-with/');
  });


  // main
  const celebrityActionOverlay = 'div.slider-container div.avatar div.action-overlay';
  const celebrityName = 'div.slider-viewport div.name';
  const userName = 'div.user-name';
  const go_profile= 'div.profile.columns a';
  const popularDjArea = 'div.top-channels.box.has-padding.is-child';
  const popularDj = 'div.top-channels.box.has-padding.is-child div.avatar div.action-overlay'
  const popularDjName = 'div.top-channels.box.has-padding.is-child div.creator-name'
  const mainpage = 'div.nav-left.nav-menu a.nav-item.is-tab'
  //chat
  const chatName = 'div.chat-room-profile a.name'
  const message_input_box = 'div.message-input-box input'
  const enter = 'div.message-input-box button.toolbar-item.is-primary'
  const toast = 'div.toaster-container.toaster-channel-chatroom span.toaster-message'
  //listen-with
  const open_listen = 'div.topic.field input#broadcast-setting-topic.input'
  const go_on_Air_btn = 'div.modal-action div.action-buttons button.button.is-capsule.is-blue-solid.action-positive'
  //profile
  const share = 'div.profile-tools button.btn-icon.profile-share'
  const copyUrl = '.sb-copybox-action';
  const Twitter_btn = 'button.sb-btn-social-block.sb-btn-twitter';
  it('Get', () => {
    cy.get(userName).invoke('text').then((username) => {
      expect(username.trim()).to.equal("1938");

    })
  });

  it.skip('ClickPopularDj', () => {
    cy.get(popularDjName).eq(0).invoke('text').then((DJName) =>{

      cy.get(popularDj).eq(0).invoke('show').find('button').click();
      cy.get(chatName).invoke('text').then((chatneam) =>{

        expect(DJName.trim()).to.equal(chatneam.trim());
      })

    });
    
  });
  it('JoinDiff', () => {
    cy.get(celebrityName).eq(0).invoke('text').then((celname) => {
      cy.get(celebrityActionOverlay).eq(0).invoke('show').find('button').click()
        .get(chatName).should('have.attr', 'title').and('eq',celname.trim());
    });
    cy.get(mainpage).first().click();

    cy.get(celebrityName).eq(-1).invoke('text').then((chatneam) =>{
      cy.get(celebrityActionOverlay).eq(-1).invoke('show').find('button').click();
      //cy.get(chatName).should('have.attr', 'title').and('not.eq',chatneam.trim());
      cy.get(chatName).then((judchatName) => {
        if(judchatName.text() == chatneam)
        {
          expect(true);
        }
        else
        {
          expect(false);
        }

      });

      // cy.get(chatName).invoke('text').then((chatneam2) =>{

      //   expect(chatneam.trim()).to.not.equal(chatneam2.trim());
      // });
    });
  });

  it.skip('toast', () => {
    cy.visit('https://portal.kkbox.com/listen-with/start-broadcast')
    .get(open_listen).clear()
    .get(open_listen).type('test !!!!!!')
    .get(go_on_Air_btn).click()
    //cy.wait(2000)
    .get(message_input_box).type('cool')
    .get(enter).click()
    .get(message_input_box).type('cool2')
    .get(enter).click();

    cy.get(toast).invoke('text').then((toastmessage) => {

      expect(toastmessage.trim()).to.equal("Please hold! Too many messages submitted. Please try again later.");
    });
  });

  it.skip('profile_Twitter', () => {
    cy.get(go_profile).eq(0).click();
    cy.get(share).click();
    cy.get(copyUrl).should('have.attr', 'data-clipboard-text').then((data) => {
      cy.window().then((win) => {
        cy.stub(win, 'open');
        cy.get(Twitter_btn).click();
        cy.window().its('open').should('be.calledWithMatch', 'https://twitter.com/intent/tweet');
        cy.window().its('open').should('be.calledWithMatch', encodeURIComponent(data));
      });
    });
  });
});
