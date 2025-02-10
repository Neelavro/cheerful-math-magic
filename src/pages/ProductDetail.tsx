
import { useParams } from "react-router-dom";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

const ProductDetail = () => {
  const { id } = useParams();
  const { addItem } = useCart();
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold">Product not found</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="aspect-square overflow-hidden rounded-lg">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="mb-4 text-3xl font-bold">{product.name}</h1>
            <p className="mb-4 text-xl font-semibold text-primary">
              ${product.price.toFixed(2)}
            </p>
            <p className="mb-6 text-muted-foreground">{product.description}</p>
          </div>
          <Button
            size="lg"
            className="w-full md:w-auto"
            onClick={() => addItem(product)}
          >
            <ShoppingCart className="mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
