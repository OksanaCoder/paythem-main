/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';

import { domainSelected, getDomains, updateDomain, createDomain, deleteDomain } from 'actions';
import Fetching from 'components/Fetching';

import CurrentDomainContainer from 'modules/CurrentDomain';
import GameListByDomain from 'modules/GameListByDomain';
import WelcomeComponent from 'pages/Admin/Home/components/WelcomeComponent';
import STORAGE from 'helpers/storage';

import css from 'styles/pages/Home.scss';

class HomeContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openUpdateWebsiteDialog: false,
      openDeleteWebsiteDialog: false,
      openWebsiteDialog: false,
      openInstallationCodeDialog: false,
      openTooltipCopySuccess: false,
      openGameFullscreenDialog: false,
      rightPanel: false,
    };
  }

  loadDomains = () => {
    const { getDomainsAction, domainSelectedAction } = this.props;
    getDomainsAction().then(res => {
      const { domains } = this.getDomains();
      // console
      if (!res.error) {
        domainSelectedAction(domains[0] || {});
      }
    });
  };

  getDomains = () => {
    const {
      domains: { data, loaded: domainsLoaded, loading: domainsLoading },
    } = this.props;
    const domains = domainsLoaded && data.data.data;
    return { domains, domainsLoaded, domainsLoading };
  };

  handleOpen = target => () => {
    console.log('click');
    if (target === 'openGameFullscreenDialog') {
      this.setState({ rightPanel: false });
    }

    this.setState({ [target]: true });
  };

  handleClose = target => () => {
    this.setState({ [target]: false });
  };

  handleUpdateWebsite = values => {
    console.log(values.domain);
    const { createDomainAction } = this.props;
    const data = {
      domain: values.domain,
    };
    createDomainAction(data).then(res => !res.error && this.loadDomains());
    this.setState({
      openWebsiteDialog: false,
    });
  };

  handleEditWebsite = values => {
    const { updateDomainAction } = this.props;
    updateDomainAction(values.id, values).then(res => !res.error && this.loadDomains());

    this.setState({
      openUpdateWebsiteDialog: false,
    });
  };

  handleDeleteWebsite = domainId => () => {
    const { deleteDomainAction } = this.props;
    console.log('domainItemSelected');
    const params = { domainId };
    deleteDomainAction(params).then(res => {
      if (!res.error) {
        this.loadDomains();
        const { data: domainsData } = res.payload.data;
        STORAGE.setItem('currentDomainStorage', domainsData[0]);
      }
    });

    this.setState({
      openDeleteWebsiteDialog: false,
    });
  };

  toggleDrawer = (side, open) => () => {
    this.setState({ [side]: open });
  };

  handleCopy = copyText => {
    document.execCommand('copy');
    this.setState({ openTooltipCopySuccess: true });
    console.log(`Copied the text: ${copyText.innerText}`);
  };

  render() {
    const { domainItemSelected } = this.props;
    const {
      openUpdateWebsiteDialog,
      openWebsiteDialog,
      openDeleteWebsiteDialog,
      rightPanel,
      openInstallationCodeDialog,
      openTooltipCopySuccess,
      openGameFullscreenDialog,
    } = this.state;
    const { domainsLoaded, domainsLoading, domains } = this.getDomains();

    const scriptToCopy = `
      <script>
        snhb.queue.push(function(){
          snhb.startAuction(["main_leaderboard", "wide_skyscraper", "bottom_medium_rectangle", "right_bottom_medium_rectangle"]);
        });
      </script>`;

    return (
      <section className={css.home__container}>
        <Fetching isFetching={domainsLoading}>
          {domainsLoaded && (
            <React.Fragment>
              {domains.length > 0 && (
                <React.Fragment>
                  <CurrentDomainContainer
                    domainItemSelected={domainItemSelected}
                    handleOpen={this.handleOpen}
                    handleClose={this.handleClose}
                    toggleDrawer={this.toggleDrawer}
                    openUpdateWebsiteDialog={openUpdateWebsiteDialog}
                    openDeleteWebsiteDialog={openDeleteWebsiteDialog}
                    openInstallationCodeDialog={openInstallationCodeDialog}
                    handleDeleteWebsite={this.handleDeleteWebsite(domainItemSelected.data._id)}
                    handleEditWebsite={this.handleEditWebsite}
                    rightPanel={rightPanel}
                    handleCopy={this.handleCopy}
                    scriptToCopy={scriptToCopy}
                    openTooltipCopySuccess={openTooltipCopySuccess}
                    openGameFullscreenDialog={openGameFullscreenDialog}
                  />

                  <GameListByDomain
                    toggleDrawer={this.toggleDrawer}
                    rightPanel={rightPanel}
                    handleOpen={this.handleOpen}
                  />
                </React.Fragment>
              )}

              {domains.length === 0 && (
                <WelcomeComponent
                  openWebsiteDialog={openWebsiteDialog}
                  handleOpen={this.handleOpen}
                  handleClose={this.handleClose}
                  handleSubmitWebsite={this.handleUpdateWebsite}
                  target="openWebsiteDialog"
                />
              )}
            </React.Fragment>
          )}
        </Fetching>
      </section>
    );
  }
}

export default connect(
  state => ({
    domainItemSelected: state.other.domainSelected,
    domains: state.get.domains,
  }),
  dispatch => ({
    getDomainsAction: () => dispatch(getDomains()),
    domainSelectedAction: data => dispatch(domainSelected(data)),
    updateDomainAction: (domainId, data) => dispatch(updateDomain(domainId, data)),
    deleteDomainAction: params => dispatch(deleteDomain(params)),
    createDomainAction: data => dispatch(createDomain(data)),
  }),
)(HomeContainer);
