import { createContext, useContext, useState, useEffect } from "react";
// import { useAuth } from "../services/authService";
import PropTypes from "prop-types";
// import { toast } from "react-toastify";
import Loading from "../components/Loading";

const ProductContext = createContext();

export const useProduct = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  //   const { user } = useAuth(); // Get the user from the auth context
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [productsName, setProductsName] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        setProducts(() => data);
        setLoading(false);

        const names = data.map((product) => product.name);
        setProductsName(names);
      })
      .catch((err) => {
        console.error(err);
        setError(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(() => data))
      .catch((err) => console.error(err));
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <ProductContext.Provider
      value={{
        products,
        categories,
        productsName,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

ProductProvider.propTypes = {
  children: PropTypes.node.isRequired,
};