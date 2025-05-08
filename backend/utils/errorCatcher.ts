import AsyncController from "../types/errorTypes";

const errorCatcher = (controller: AsyncController): AsyncController =>
  async(req, res, next) =>{
    try{
      await controller(req, res, next);
    }
    catch(error){
      next(error);
    }
  };

export default errorCatcher;