const getColorForLetter = (letter) => {
  const colors = {
    A: "#1abc9c",
    B: "#2ecc71",
    C: "#3498db",
    D: "#9b59b6",
    E: "#34495e",
    F: "#16a085",
    G: "#27ae60",
    H: "#2980b9",
    I: "#8e44ad",
    J: "#2c3e50",
    K: "#f1c40f",
    L: "#e67e22",
    M: "#e74c3c",
    N: "#ecf0f1",
    O: "#95a5a6",
    P: "#f39c12",
    Q: "#d35400",
    R: "#c0392b",
    S: "#bdc3c7",
    T: "#7f8c8d",
    U: "#d35400",
    V: "#8e44ad",
    W: "#27ae60",
    X: "#2980b9",
    Y: "#2c3e50",
    Z: "#f39c12",
  };

  return colors[letter.toUpperCase()] || "#9400f7";
};
export default getColorForLetter;
