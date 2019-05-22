import { Selector, ClientFunction } from 'testcafe';

// login
const loginBtn = Selector('div.nav-item.nav-item--login-status a.nav-link')
const kkboxLogin = Selector('a.btn.kkbox')
const loginAccount = Selector('form#form-login div.form-group input#username')
const loginPassword = Selector('form#form-login div.form-group input#password')
const loginConfirm = Selector('form#form-login div.form-group input.btn.btn-block.btn-default.btn-lg.btn-primary.btn-email')

//Menu 
const dropdownMenu = Selector('div.login-status')
const logout = Selector('a.dropdown-item.logout')
const accounInformation = Selector('a.dropdown-item.account')

//Account Page
const account = Selector('ul.info__content li.info__item')
const accountLevel = Selector('ul.info__content li.info__item span')

//Home Page
const homePage = Selector('ul.left li a.navbar__link')
const favoritePage = Selector('li.nav-item.nav-item--favorites a.nav-link.nav-link--favorites')
const explore = Selector('a.nav-link.nav-link--genres')
const todayVideoSection = Selector('div.list--carousel__main').nth(3)
const todayVideo = Selector(todayVideoSection).child('div.list--carousel__body.is-inited').child('div.list--carousel__item.selected')
const playVideoSection = Selector('div.title__main').nth(2)
const playVideo = Selector(playVideoSection).child('section.btn.btn-primary.btn--play')
const collectSection = Selector('div.btn btn--toggle.btn--fav.deactive').nth(2)
const getVideoNameSection = Selector('div.flixlist__detail').nth(2).child('div.title__main').child('section.fixed').child('h1')
//FavirutePage
const oneFavoriteVideo = Selector('div.item__main').nth(0).child('div.img-wrapper').child('img').getAttribute('alt')

//Scroll 
const testscroll = ClientFunction(() => { 
  window.scrollTo({
    top: 1200,
    left: 0,
    behavior: 'smooth'
  });
});

fixture `KKBOX TV Test`
  .page `https://www.kktv.me/`
  .beforeEach(async t => {
     await t
  	   .click(loginBtn)
       .click(kkboxLogin)
       .typeText(loginAccount, 'open860321@gmail.com')
       .typeText(loginPassword, 'gba3pda2')
       .click(loginConfirm);
  })
  .afterEach(async t => {
    await t
      //.click(homePage)
      .hover(dropdownMenu)
      .click(logout);
  })
test.skip('check_username', async t => {
  await t 
    .hover(dropdownMenu)
    .click(accounInformation)
    .expect(account.innerText).eql('open860321@gmail.com')
    .expect(accountLevel.innerText).eql('KKBOX Prime 會員');

});

test.skip('playVideo', async t => {
 await testscroll();
 await t
  .click(todayVideo)
  .click(playVideo);
});
test('collect_video', async t => {
 await testscroll();
 await t
  .click(todayVideo)
  .clickI(collectSection);
 await t
  .click(favoritePage)
  .expect(getVideoNameSection.innerText).eql(oneFavoriteVideo.innerText)
});

