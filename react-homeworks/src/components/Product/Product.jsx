import "./product.scss";
import PropTypes from "prop-types";
import { FaRegStar, FaStar } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../Modal/Modal";
import { modalContent } from "../../utils/modalContent";
import {
  addFavorites,
  removeFavorites,
} from "../../store/actions/favoritesActions";
import { addProducts, removeProducts } from "../../store/actions/cartActions";
import { setModal } from "../../store/actions/modalActions";

const Product = ({ product, isInCart }) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const favorites = useSelector((state) => state.favorites.favorites);

  const { modalData, isModalOpen, selectedProductId } = useSelector(
    (state) => state.modal
  );

 
  const isFavorited = favorites.find((fav)=>fav.sku === product.sku);

  const handleFav = (product) => {
    if (!isFavorited) {
      dispatch(addFavorites(product));
    }
  };

  const removeFav = (productId) => {
    dispatch(removeFavorites(productId));
  };

  const handleOpenModal = (productId, modalId) => {
    const currentModal = modalContent.find((modal) => modal.id === modalId);
    if (currentModal) {
      dispatch(setModal(true, currentModal, productId));
    }
  };
  const handleCloseModal = () => {
    dispatch(setModal(false, null, null));
  };

  const handleAddProduct = (selectedProduct) => {
    const productToAdd = products.find(
      (product) => product.sku === selectedProduct.sku
    );

    const newCartItem = {
      id: uuidv4(),
      ...productToAdd,
    };

    dispatch(addProducts(newCartItem));
    handleCloseModal();
  };

  const removeProduct = (id) => {
    dispatch(removeProducts(id));
    handleCloseModal();
  };

  return (
    <>
      <div className="product-item">
        <img src={product.img_path} alt="" />
        <div className="product_header">
          <h2 className="product-title">{product.name}</h2>
          <span
            className="fav"
            onClick={() => {
              isFavorited ? removeFav(product.sku) : handleFav(product);
            }}
          >
            {isFavorited ? (
              <FaStar style={{ color: "#ff6720" }} />
            ) : (
              <FaRegStar />
            )}
          </span>
        </div>
        <p className="product-description">
          {
            product.description.length > 100 ? product.description.slice(0, 100) + '...' : product.description
          }
        </p>
        <div className="product-details">
          <h4 className="product-price">{"$" + product.price}</h4>
          {isInCart ? (
            <button
              className="btn-delete"
              data-testid="btn-remove-from-cart"
              onClick={() => {
                handleOpenModal(product.id, "modal2");
              }}
              
            >
              remove
            </button>
          ) : (
            <button
              className="btn-add"
              onClick={() => handleOpenModal(product, "modal1")}
              data-testid='btn-add-to-cart'
            >
              add to card
            </button>
          )}
        </div>
      </div>
      {isModalOpen && (
        <Modal
          modalData={modalData}
          closeButton={true}
          actions={
            <>
              {modalData.action === "add" ? (
                <button onClick={() => handleAddProduct(selectedProductId)} data-testid='modal-add-btn'>
                  
                  Ok
                </button>
              ) : modalData.action === "remove" ? (
                <button onClick={() => removeProduct(selectedProductId)} data-testid='modal-remove-btn'>
                  Ok
                </button>
              ) : null}
              <button onClick={handleCloseModal}    data-testid='cancelbtn'>Cancel</button>
            </>
          }
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};

Product.propTypes = {
  product: PropTypes.object,
  onClick: PropTypes.func,
  handleFav: PropTypes.func,
  favorites: PropTypes.array,
  removeFav: PropTypes.func,
};

Product.defaultProps = {
  product: {},
  favorites: [],
};

export default Product;
