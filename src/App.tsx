import { useState } from "react";
import "./App.css";
import Button from "./components/Button";
import FormAddFriend from "./components/FormAddFriend";
import FormSplitBill from "./components/FormSplitBill";
import FriendList from "./components/FriendList";
import { initialFriends } from "./data/initialFriends";
import { Friend } from "./types/Friend";

function App() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [friends, setFriends] = useState(initialFriends);
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);

  const handleSelectFriend = (friend: Friend) => {
    setSelectedFriend((cur) => (cur?.id === friend.id ? null : friend));
    setIsFormOpen(false);
  };
  function handleClickAddFriend() {
    setIsFormOpen((prevState) => !prevState);
  }
  function handleAddFriend(friend: Friend) {
    setFriends((prevFriends) => [...prevFriends, friend]);
    setIsFormOpen(false);
  }

  function handleSplitBill(value: number) {
    if (!selectedFriend) return;

    setFriends((prevFriends) =>
      prevFriends.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );
  }
  return (
    <div className="app">
      <div className="sidebar">
        <FriendList
          friends={friends}
          selectedFriend={selectedFriend}
          onSelectFriend={handleSelectFriend}
        />

        {isFormOpen && <FormAddFriend onAddFriend={handleAddFriend} />}
        {(!isFormOpen && (
          <Button onClick={handleClickAddFriend}>Add Friend</Button>
        )) || <Button onClick={handleClickAddFriend}>Close</Button>}
      </div>
      {selectedFriend && (
        <FormSplitBill
          selectedFriend={selectedFriend}
          onSplitBill={handleSplitBill}
        />
      )}
    </div>
  );
}

export default App;
