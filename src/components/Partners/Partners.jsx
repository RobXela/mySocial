import React from 'react'
import style from './Partners.module.css'
import userPhoto from './../../assets/images/user.jpeg'
import { NavLink } from 'react-router-dom'
import { followAPI } from './../../api/api'


let Partners = (props) => {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)

    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    return <div>
        <div> {pages.map(p => {
            return <span className={props.currentPage === p && style.selectedPage}
                onClick={() => { props.onPageChanged(p) }}>{p}</span>
        })}
        </div>{
            <div> {props.users.map(u => <div key={u.id}>
                <span>
                    <div>
                        <NavLink to={'/profile/' + u.id}>
                            <img alt="" className={style.ava} src={u.photos.small != null ? u.photos.small : userPhoto} />
                        </NavLink>
                    </div>
                    <div>
                        {u.followed
                            ? <button
                                disabled={props.followingInProgress.some(id => id === u.id)}
                                onClick={() => {
                                    props.toggleIsFollowingProgress(true, u.id)
                                    followAPI.UnFollow(u.id)
                                        .then(response => {
                                            if (response.resultCode === 0) {
                                                props.unFollow(u.id)
                                            }
                                            props.toggleIsFollowingProgress(false, u.id)
                                        })
                                }}>Unfollow</button>

                            : <button
                                disabled={props.followingInProgress.some(id => id === u.id)}
                                onClick={() => {
                                    props.toggleIsFollowingProgress(true, u.id)
                                    followAPI.follow(u.id)
                                        .then(response => {
                                            if (response.resultCode === 1) {
                                                props.follow(u.id)
                                            }
                                            props.toggleIsFollowingProgress(false, u.id)
                                        })
                                }}>Follow</button>}
                    </div>
                </span>
                <span>
                    <span>
                        <div>{u.name}</div>
                        <div> Status: {u.status}</div>
                    </span>
                    <span>
                        <div> From: {'u.location.country'}</div>
                        <div>{'u.location.city'}</div>
                    </span>
                </span>
            </div>)}
            </div>}</div>
}

export default Partners