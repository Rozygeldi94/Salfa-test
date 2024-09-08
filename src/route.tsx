import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import ProductPage from "./pages/ProductPage";

const AllProducts = lazy(() => import("./pages/AllProducts"));
const CreateProduct = lazy(() => import("./pages/CreateProduct"));

export const ROOT = "/products";
export const SINGLE_PRODUCT = `${ROOT}/:category/:id/:title`;
export const CREATE_PRODUCT = `${ROOT}/create-product`;

export const route = createBrowserRouter([
  {
    path: ROOT,
    element: <Layout />,
    children: [
      { path: ROOT, element: <AllProducts /> },
      {
        path: SINGLE_PRODUCT,
        element: <ProductPage />,
      },
      {
        path: CREATE_PRODUCT,
        element: <CreateProduct />,
      },
    ],
  },
]);
