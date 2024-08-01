import { Routes, Route, useParams } from "react-router-dom";
import { ProductList, CreateProduct, InfoProduct } from "../../components";

const ProductInfo = () => {
  const { id } = useParams();
  return <InfoProduct id={Number(id)} onClose={() => {}} />;
};

const Product = () => {
  return (
    <div className="content-area">
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/createproduct" element={<CreateProduct />} />
        <Route path="/infoproduct/:id" element={<ProductInfo />} />
      </Routes>
    </div>
  );
};

export default Product;
