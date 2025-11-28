import Friend from "./Friend";
import { Friend as FriendType } from "../types/Friend";

interface FriendListProps {
  friends: FriendType[];
  onSelectFriend: (friend: FriendType) => void;
  selectedFriend: FriendType | null;
}

function FriendList({
  friends,
  onSelectFriend,
  selectedFriend,
}: FriendListProps) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          friend={friend}
          key={friend.id}
          onSelectFriend={onSelectFriend}
          selectedFriend={selectedFriend}
        />
      ))}
    </ul>
  );
}

export default FriendList;
