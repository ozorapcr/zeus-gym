import { COLORS } from "../constants";
import Badge from "./Badge";
import Button from "./Button";
import Card from "./Card";

export default function ProductCard({ image, title, category, price, description }) {
  return (
    <Card style={{ padding: 0 }}>
      <img
        src={image}
        alt={title}
        style={{
          aspectRatio: "16 / 10",
          display: "block",
          objectFit: "cover",
          width: "100%",
        }}
      />

      <div style={{ padding: 20 }}>
        <Badge type="primary">{category}</Badge>

        <h3
          style={{
            color: COLORS.text,
            fontSize: 20,
            margin: "16px 0 8px",
          }}
        >
          {title}
        </h3>

        <p
          style={{
            color: COLORS.textSec,
            fontSize: 14,
            lineHeight: 1.7,
            margin: "0 0 18px",
          }}
        >
          {description}
        </p>

        <div
          style={{
            alignItems: "center",
            display: "flex",
            gap: 14,
            justifyContent: "space-between",
          }}
        >
          <strong style={{ color: COLORS.accent, fontSize: 20 }}>{price}</strong>
          <Button type="primary">Detail</Button>
        </div>
      </div>
    </Card>
  );
}
