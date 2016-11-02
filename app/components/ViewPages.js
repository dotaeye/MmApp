import * as Pages from '../pages';

export default ViewPage = {
  main: ()=> {
    return {
      component: Pages.Main,
      name: 'main'
    }
  },
  home: ()=> {
    return {
      component: Pages.Home,
      name: 'home'
    }
  },
  selectCar: ()=> {
    return {
      component: Pages.SelectCar,
      name: 'selectCar'
    }
  },
  list: ()=> {
    return {
      component: Pages.List,
      name: 'list'
    }
  },
  splash: ()=> {
    return {
      component: Pages.Splash,
      name: 'splash'
    }
  }
}