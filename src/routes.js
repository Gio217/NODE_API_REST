import  {Router} from'express';
import UserController from './controllers/UserController';
import ProductController from './controllers/ProductController';
import NavigationController from './controllers/NavigationController';

const routes = new Router();
routes.post('/register/user', UserController.store);
routes.get('/user/:email_address', UserController.index);
routes.delete('/user', UserController.destroy);

routes.post('/register/product', ProductController.store);
routes.get('/product/:sku', ProductController.index);
routes.delete('/product', ProductController.destroy);

routes.post('/register/navigation', NavigationController.store);
routes.get('/navigation/:session', NavigationController.index);
routes.delete('/navigation', NavigationController.destroy);

export default routes;