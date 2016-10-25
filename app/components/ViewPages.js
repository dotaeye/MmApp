import * as Pages from '../pages';

export default ViewPage = {
  home: ()=> {
    return {
      component: Pages.Home,
      name: 'home'
    }
  },
  splash: ()=> {
    return {
      component: Pages.Splash,
      name: 'splash'
    }
  }
}