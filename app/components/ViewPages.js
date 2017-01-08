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
  search: ()=> {
    return {
      component: Pages.Search,
      name: 'search'
    }
  },
  product: ()=> {
    return {
      component: Pages.Product,
      name: 'product'
    }
  },
  splash: ()=> {
    return {
      component: Pages.Splash,
      name: 'splash'
    }
  },
  address: ()=> {
    return {
      component: Pages.Address,
      name: 'address'
    }
  },
  addressList: ()=> {
    return {
      component: Pages.AddressList,
      name: 'addressList'
    }
  },
  order: ()=> {
    return {
      component: Pages.Order,
      name: 'order'
    }
  },
  orderDetail: ()=> {
    return {
      component: Pages.OrderDetail,
      name: 'orderDetail'
    }
  },
  checkOut: ()=> {
    return {
      component: Pages.CheckOut,
      name: 'checkOut'
    }
  },
  shopCart: ()=> {
    return {
      component: Pages.ShopCart,
      name: 'shopCart'
    }
  },
  login: ()=> {
    return {
      component: Pages.Login,
      name: 'login'
    }
  },
  codeLogin: ()=> {
    return {
      component: Pages.CodeLogin,
      name: 'codeLogin'
    }
  },
  register: ()=> {
    return {
      component: Pages.Register,
      name: 'register'
    }
  },
  about: ()=> {
    return {
      component: Pages.About,
      name: 'about'
    }
  },
  pickerAddress: ()=> {
    return {
      component: Pages.PickerAddress,
      name: 'pickerAddress'
    }
  },
  pay: ()=> {
    return {
      component: Pages.Pay,
      name: 'pay'
    }
  },
  Topic:()=>{
    return {
      component: Pages.Topic,
      name: 'topic'
    }
  }
}