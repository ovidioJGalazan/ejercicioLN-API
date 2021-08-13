const { mockData } = require("../utils/mocks/data");

class CuentasService {
  async filter ({filterBy, filterValue}) {
    let cuentas = await Promise.resolve(mockData.accounts);

    switch(filterBy){
    case "tags":
      cuentas = cuentas.filter( (currentValue) => {
        if(currentValue.tags[0] && (currentValue.tags[0].name === filterValue)){
          return currentValue;
        }
      });
      
      break;
    case "haveVoucher":
      cuentas = cuentas.filter( (cuenta) => {
        if(cuenta[filterBy] === Boolean(filterValue)){
          return cuenta;
        }
      });
      break;
    default:
      break;
    }

    return cuentas;
  }

  //Puede agregarse un orderValue para hablar de ordenamiento alfb. asc o desc, distance asc o dsc. etc.
  order ({cuentas, orderBy}){
    
    let result=cuentas;
    const nearbyOrder = () => {
      //Si debo filtrar por sucursal más cercana entonces
      // dado que sucursal es un array de objetos con key location (number)
      // tengo que primero obtener la menor location de cada array (branch) y luego comparar
      // las distancias obtenidas de cada cuenta 
          
      //Formo un nuevo array con las menores distancias
      const distances = cuentas.map( (cuenta) => {
        //Formo un nuevo array con las distancias de las sucursales de la cuenta
        const locations = cuenta.branches.map((branch) => {
          return branch.location;
        });
          //Obtengo la distancia de la sucursal más cercana de la cuenta
        const nearestLocation = Math.min.apply(null,locations);  
        return {...cuenta, nearestLocation};
      });

      result = distances.sort((firstEl, secondEl) => {
        //firstEl first
        if (firstEl.nearestLocation < secondEl.nearestLocation) {
          return -1;
        }
        //secondEl first
        if (firstEl.nearestLocation > secondEl.nearestLocation) {
          return 1;
        }
        // Son iguales
        return 0;
      });  
    };
  
    const descOrder = () => {
      //Debo ordenar Z-a de cuentas.name 
      result = cuentas.sort((firstEl, secondEl) => {
        //firstEl first
        if (firstEl.name > secondEl.name) {
          return -1;
        }
        //secondEl first
        if (firstEl.name < secondEl.name) {
          return 1;
        }
        // Son iguales
        return 0;
      });     
    };

    switch(orderBy){
    case "nearby": 
      nearbyOrder();
      break;
    case "desc": 
      descOrder();
      break;
    default:
      break;
    }
    
    return result;
  }

  paginate ({cuentas, pag, qty}) {
    return cuentas.slice((pag-1)*qty, (pag*qty));
  }

}

module.exports = CuentasService;