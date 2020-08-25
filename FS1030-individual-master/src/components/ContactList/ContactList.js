import React from 'react';
import ContactListContent from './ContactListContent';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';
 
function ContactList() {
  return (
    <div>
     <ThemeProvider theme={theme}>
      <ContactListContent />
    </ThemeProvider>
    </div>
  );
}

export default ContactList;
