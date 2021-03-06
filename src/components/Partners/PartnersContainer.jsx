import { connect } from "react-redux";
import { follow, getUsers, unFollow, getDataPageChange } from "./../../Redux/partners-reducer";
import Partners from "./Partners";
import React from 'react';
import Preloader from '../common/Preloader/Preloader';
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";
import { getCurrentPage, getFollowingInProgress, getIsFetching,
    getPageSize, getTotalUsersCount, getUsersSelector } from "../../Redux/partners-selectors";


class PartnersContainer extends React.Component {

    componentDidMount() {
        const {currentPage, pageSize} = this.props
        this.props.getUsers(currentPage, pageSize)
    }


    onPageChanged = (pageNumber) => { 
        const {pageSize} = this.props 
        this.props.getDataPageChange(pageNumber, pageSize)
    }

    render() {
    
        return (<div>
            {this.props.isFetching ? <Preloader /> : null}

            <Partners
                totalUsersCount={this.props.totalUsersCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                selectedPage={this.props.selectedPage}
                users={this.props.users}
                unFollow={this.props.unFollow}
                follow={this.props.follow}
                onPageChanged={this.onPageChanged}
                isFetching={this.props.isFetching}
                toggleIsFollowingProgress={this.props.toggleIsFollowingProgress}
                followingInProgress={this.props.followingInProgress}
            />
        </div>
        )
    }
}




const mapStateToProps = (state) => {
    return {
        users: getUsersSelector(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
    }
}



export default compose(
    connect(mapStateToProps, 
        {follow, unFollow,  getUsers, getDataPageChange}),
    withAuthRedirect
) (PartnersContainer)