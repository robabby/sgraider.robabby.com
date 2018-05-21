// StackNew shows StackForm and StackFormReview
import React from 'react';
import TextField from '@material-ui/core/TextField';


export default ({ input, label, type, testVal, meta: { error, touched } }) => {
  const { name } = input;

  return (
    <div>
      <TextField
        id={name}
        label={label}
        margin="normal"
        {...input}
      />
    </div>
  );
};
