export const styles = {
  root: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 20,
    textAlign: 'left',
    minHeight: '100vh'
  },
  input: {
    width: 375,
    height: 40,
    fontSize: 16,
    padding: '1em',
    border: '2px solid transparent',
    outline: 'none',
    backgroundColor: 'white',
    cursor: 'text',
    ':focus': {
      border: 'none',
      outline: 'none'
    }
  }
}
