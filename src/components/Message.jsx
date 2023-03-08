const messageBarStyle = {
  padding: "20px",
  backgroundColor: "red",
  color: "white",
  marginBottom: "15px",
};

const closeButtonStyle = {
  marginLeft: "15px",
  color: "white",
  fontWeight: "bold",
  float: "right",
  fontSize: "22px",
  lineHeight: "20px",
  cursor: "pointer",
};

const Message = ({ type, content, deleteFlash }) => {
  const style =
    type === "green" || type === "success"
      ? { ...messageBarStyle, backgroundColor: "green" }
      : messageBarStyle;
  return (
    <div style={style}>
      {content}
      <span style={closeButtonStyle} onClick={deleteFlash}>
        &times;
      </span>
    </div>
  );
};

export default Message;
