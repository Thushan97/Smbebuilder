/* eslint-disable */ 
 /**
  * Internal Dependencies
  */
  import AsyncComponent from '../../../components/async-component';
  import PageWrap from '../../../components/page-wrap';
  import PageTitle from '../../../components/page-title';
  import PageContent from '../../../components/page-content';

  import { Row, Col, Button, CustomInput, Label, Input } from 'reactstrap';
  import React, { useState } from "react";
  import { connect } from "react-redux";
  
  function EditUser() {
      return (
          <PageWrap>
              <PageTitle
                  breadcrumbs={ {
                      '/': 'Home',
                      '/users/edit-user': {
                         title: 'Apps',
                         sub: 'apps',
                     },
                  } }
              >
                  <h1>Edit User</h1>
                  <br />
              </PageTitle>
              <PageContent>
                  <AsyncComponent component={ () => import('./content') } />
              </PageContent>
          </PageWrap>
      );
  }
  
  export default connect(({ settings }) => ({
      settings,
  }))(EditUser);
 