function Die(props) {
  const { number, isHeld, onHoldDie, id } = props;
  const classes = isHeld ? "box__die box__die--is-held" : "box__die";
  return (
    <div onClick={onHoldDie} className={classes}>
      {number}
    </div>
  );
}

export default Die;
