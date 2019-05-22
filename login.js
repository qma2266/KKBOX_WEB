import { Selector } from 'testcafe';

// login
const uidTestField = Selector('div.account form input#uid');
const pwdTestField = Selector('div.account form input#pwd');
const loginButton = Selector('div.account form input#login-btn');

// leading
const leadingPage = Selector('.leading-page-modal-window');
const close = Selector('div.close');

// main
const dropdown = Selector('div.user-nav.dropdown');

// dropdown menu
const dropdownButton = Selector('.dropdown-menu li a');
const myProfile = Selector(dropdownButton.withText('我的個人首頁'));
const logout = Selector(dropdownButton.withText('登出'))
// profile
const profileName = Selector('div.profile div.user-name');
// edit
const edit = Selector('div.page-tools button.btn-edit');
const personal_descriprion = Selector('div.form-group-wrapper textarea#user-intro');
const form_btn = Selector('div.form-action button.btn-mybox.btn-dialog-primary');
const personal_descriprion_text = Selector('div.fix-switch-slide div.user-intro');
//discovery
const explore = Selector('div.sidebar-nav ul li a').withText('線上精選');
const playList = Selector('div.playlist').nth(1);
const today_song = Selector(playList).child('div');
const play_today_song = Selector('div.media-body div.actions a').nth(0);
const playTodaySongHover = Selector('div.media-body div.actions a i');
const playButton = Selector('div.controls a#playBtn');
const pauseButton = Selector('div.controls a#pauseBtn');

fixture `KKBOX Web Player Test`
  .page `https://play.kkbox.com/explore`
  .beforeEach(async t => {
    await t
     	.typeText(uidTestField, 'demo1938@kkbox.com')
     	.typeText(pwdTestField, '1938test')
     	.click(loginButton);
  	/*
  	await t
    	.click(dropdown)
    	.click(myProfile)
   		.expect(profileName.innerText).eql('119933888');
      */  
    if(await leadingPage.exists) {
      await t.click(close);
    } 
  });

test('check_profile', async t => {
  await t
  	.click(edit)
  	.typeText(personal_descriprion, "testcafe test", {replace: true})
  	.click(form_btn);

  await t
  	.click(dropdown)
  	.click(myProfile)
  	.expect(personal_descriprion_text.innerText).eql('testcafe test');

});


test.skip('Relogin', async t => {
  await t
  	.click(dropdown)
  	.click(logout)
  	.typeText(uidTestField, 'demo1938@kkbox.com')
    .typeText(pwdTestField, '1938test')
    .click(loginButton);
  await t
  	.click(dropdown)
    .click(myProfile)
   	.expect(profileName.innerText).eql('119933888');

});


test.skip('play_song', async t => {
  await t
    .click(explore)
	.wait(1000)
	.setNativeDialogHandler(() => true)
    .click(today_song, {speed : 0.25})
    //.click(play_today_song, {speed : 0.25});
 await t
   .expect(playButton.getAttribute('style')).eql('display: none;')
   .expect(pauseButton.getAttribute('style')).eql('display: inline;');
});
