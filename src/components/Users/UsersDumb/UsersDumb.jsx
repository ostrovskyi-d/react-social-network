import React from "react";
import s from './UsersDumb.module.css';
import {NavLink} from "react-router-dom";
import UserAvatarPlaceholder from "../../Placeholders-etc/UserAvatarPlaceholder/UserAvatarPlaceholder";
import Button from '@material-ui/core/Button';

const UsersDumb = (props) => {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);

    let pages = [];

    for (let i = 1; i <= pagesCount; i++) {
        pages[i] = i;
    }

    pages = pages.map((p, i) => {
            return (
                <span key={i}
                      onClick={() => props.onChangePage(p)}
                      className={props.currentPage === p && s.selectedPage}>
                    {p}
                </span>
            )
        }
    );

    return (
        <div className={s.userWrapper}>

            <button className={s.getUsersButton} onClick={props.getMoreUsers}>LOAD USERS</button>
            <div className={s.pagesBlock}>
                {/*цей wrapper - з overflow hidden - костиль (забрати overflow hidden і подивитися чому)*/}
                <span className={s.pagesWrapper}>
                    {pages}
                    </span>
            </div>
            {props.users.map(user => (
                    <div className={s.userItem} key={user.id}>
                        <div className={s.avaAndUserInfo}>
                            <NavLink className={s.userAvaWrapper} to={"/profile/" + user.id}>
                                {
                                    user.photos.small !== null
                                        ? <img className={s.userAvaImg} src={user.photos.small} alt=""/>
                                        : <UserAvatarPlaceholder/>
                                }
                            </NavLink>

                            <div className={s.userInfo}>
                                <span className={s.nickName}>
                                    {user.name}
                                </span>
                                <span className={s.status}>
                                    STATUS: {user.status}
                                </span>
                            </div>
                        </div>
                        <div className={s.buttons}>
                            <div className={s.followButtonWrapper}>


                                {user.followed
                                    ? <Button variant="contained"
                                              color="primary"
                                              disabled={props.isFollowingInProgress.some(id => id === user.id)}
                                              onClick={() => props.unfollow(user.id)}>
                                        Unfollow
                                    </Button>
                                    : <Button variant="contained"
                                              color="primary"
                                              disabled={props.isFollowingInProgress.some(id => id === user.id)}
                                              onClick={() => props.follow(user.id)}>
                                        Follow
                                    </Button>
                                }
                            </div>
                        </div>
                    </div>
                )
            )}
            <div className={s.pagesBlock}>
                {/*цей wrapper - з overflow hidden - костиль (забрати overflow hidden і подивитися чому)*/}
                <span className={s.pagesWrapper}>
                    {pages}
                    </span>
            </div>
        </div>

    )
};
export default UsersDumb;