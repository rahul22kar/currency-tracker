import { StarFilled, StarOutlined } from "@ant-design/icons";

interface Props {
  isFavourite: boolean;
  currencyId: string;
  onClick: (currencyId: string) => void;
}

const FavouriteStar = ({ isFavourite, currencyId, onClick }: Props) => {
  return (
    <span onClick={() => onClick(currencyId)}>
      {isFavourite ? (
        <StarFilled
          style={{ color: "#ffc53d", fontSize: "20px", cursor: "pointer" }}
          className={"star-filled"}
        />
      ) : (
        <StarOutlined
          style={{ color: "#ffc53d", fontSize: "20px", cursor: "pointer" }}
          className={"star-outlined"}
        />
      )}
    </span>
  );
};

export default FavouriteStar;
