import React from 'react';
import BlogAdminListContent from './BlogAdminListContent';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';
 
function BlogAdminList() {
  return (
    <div>
     <ThemeProvider theme={theme}>
      <BlogAdminListContent />
    </ThemeProvider>
    </div>
  );
}

export default BlogAdminList;
