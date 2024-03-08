import OrderController from '../controllers/OrderController.js'
import ProductController from '../controllers/ProductController.js'
import RestaurantController from '../controllers/RestaurantController.js'
import { create, update } from '../controllers/validation/RestaurantValidation.js'
import { hasRole, isLoggedIn } from '../middlewares/AuthMiddleware.js'
import { checkEntityExists } from '../middlewares/EntityMiddleware.js'
import { checkRestaurantOwnership, restaurantHasNoOrders } from '../middlewares/RestaurantMiddleware.js'
import { handleValidation } from '../middlewares/ValidationHandlingMiddleware.js'
import { Restaurant } from '../models/models.js'

const loadFileRoutes = function (app) {
  app.route('/restaurants')
    .get(
      RestaurantController.index)
    .post(
    // TODO: Add needed middlewares(completed)
      isLoggedIn,
      hasRole('owner'),
      create,
      handleValidation,
      // checkRestaurantOwnership,
      RestaurantController.create)

  app.route('/restaurants/:restaurantId')
    .get(
      checkEntityExists(Restaurant, 'restaurantId'),
      RestaurantController.show)
    .put(
    // TODO: Add needed middlewares(completed)
      isLoggedIn,
      hasRole('owner'),
      checkEntityExists(Restaurant, 'restaurantId'),
      checkRestaurantOwnership,
      update,
      handleValidation,
      RestaurantController.update)
    .delete(
    // TODO: Add needed middlewares(completed)
      isLoggedIn,
      hasRole('owner'),
      checkEntityExists(Restaurant, 'restaurantId'),
      checkRestaurantOwnership,
      restaurantHasNoOrders,
      RestaurantController.destroy)

  app.route('/restaurants/:restaurantId/orders')
    .get(
    // TODO: Add needed middlewares(completed)
      isLoggedIn,
      hasRole('owner'),
      checkEntityExists(Restaurant, 'restaurantId'),
      checkRestaurantOwnership,
      OrderController.indexRestaurant)

  app.route('/restaurants/:restaurantId/products')
    .get(
    // TODO: Add needed middlewares(completed)
      isLoggedIn,
      checkEntityExists(Restaurant, 'restaurantId'),
      ProductController.indexRestaurant)

  app.route('/restaurants/:restaurantId/analytics')
    .get(
    // TODO: Add needed middlewares(completed)
      isLoggedIn,
      hasRole('owner'),
      checkEntityExists(Restaurant, 'restaurantId'),
      checkRestaurantOwnership,
      handleValidation,
      OrderController.analytics)
}
export default loadFileRoutes
