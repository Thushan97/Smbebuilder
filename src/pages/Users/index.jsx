/* eslint-disable */ 
 /**
  * Internal Dependencies
  */
 import AsyncComponent from '../../components/async-component';
 import PageWrap from '../../components/page-wrap';
 import PageTitle from '../../components/page-title';
 import PageContent from '../../components/page-content';
 import api from '../../services/api';
 
 import React, { useState } from "react";
 import { connect } from "react-redux";
 import {
     Button
 } from "reactstrap";
 import {     addToast as actionAddToast} from "../../actions";
 
 function AllUsers() {
     return (
         <PageWrap>
             <PageTitle
                 breadcrumbs={ {
                     '/': 'Home',
                     '/users': {
                        title: 'Apps',
                        sub: 'apps',
                    },
                 } }
             >
                 <h1>All Users</h1>
                 <br />
             </PageTitle>
             <PageContent>
                 <AsyncComponent component={ () => import( './content' ) } />
             </PageContent>
         </PageWrap>
     );
 }
 
 export default connect(({ settings }) => ({
     settings,
 }))(AllUsers);

 