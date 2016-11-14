const React = require('react');
const render = require('react-dom').render;

class FormBox extends React.Component {

  doSubmit = e => {
    console.log('Tried to submit, should work', e);
  }

  render() {
    return (
      <form action={'/submit'}
	    method={'post'}
	    onSubmit={this.doSubmit}>
	Click it:
	<input type={'submit'} value={'Submit'}/>
      </form>
    );
  }
};

module.exports = FormBox;
