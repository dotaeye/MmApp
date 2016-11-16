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
  }
}