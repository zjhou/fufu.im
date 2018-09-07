import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import Nav from '../../static-com/Nav/Nav';
import {getPosts} from '../../../service/BlogApi';
import Post from '../../static-com/Post/Post';
import BlogHeader from '../../static-com/BlogHeader/BlogHerder';
import PageNav from '../../static-com/PageNav/PageNav';
import ErrorPanel from '../../static-com/ErrorBoundary/ErrorPanel';
import DaysFrom from '../../static-com/DaysFrom/DaysFrom';
import {Row, Col} from '../../static-com/Layout/Layout';
import Config from '../../../../../config/blog.config';
import {connect} from 'react-redux';
import {fetchPosts, fetchPostsDone} from '../../../../redux/actions/index';

class Blog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {hasException: false};
        this.loadPosts = this.loadPosts.bind(this);
        this.PcLayout = this.PcLayout.bind(this);
        this.MobileLayout = this.MobileLayout.bind(this);
    }

    componentDidMount() {
        return this.loadPosts(this.props.activePostsType, this.props.pagenow);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (nextProps.loadingPosts !== this.props.loadingPosts)
            || (nextState.hasException !== this.state.hasException)
            || (nextProps.activePostsType !== this.props.activePostsType)
            || (nextProps.pagenow !== this.props.pagenow);
    }

    async loadPosts(type, pagenow) {
        if(!type){return;}
        if(Config.isMobile){
            this.postsWrapper.scrollTop = 0;
        }else{
            scrollTo(0,-1);
        }
        this.props.dispatch(fetchPosts(false));
        let posts = await getPosts(type, pagenow, this.props.posts.nextPage);
        setTimeout(() => {
            this.props.dispatch(fetchPostsDone('SUCCESS', posts));
            this.props.dispatch(fetchPosts(true));
        }, 200);
    }

    componentDidUpdate(prevProps) {
        if (
            prevProps.activePostsType !== this.props.activePostsType ||
            prevProps.pagenow !== this.props.pagenow
        ) {
            this.loadPosts(this.props.activePostsType, this.props.pagenow)
                .catch(e => {
                    console.error(e);
                    this.dispatch(fetchPostsDone('ERROR'));
                });
        }
    }

    MobileLayout() {
        return (
            <React.Fragment>
                <header>
                    <BlogHeader {...this.props.config}/>
                    <DaysFrom start="2017-11-18"/>
                </header>
                <section data-loading={this.props.loadingPosts}
                    ref={posts => this.postsWrapper = posts}
                >
                    {
                        !this.props.loadingPosts &&
                        this.props.posts.list &&
                        this.props.posts.list.map((post, index) =>
                            <Post {...post} key={index}/>
                        )
                    }
                    {
                        !this.props.loadingPosts &&
                        (this.props.posts.prevPage || this.props.posts.nextPage) &&
                    <PageNav
                        {...this.props.posts}
                    />
                    }
                </section>
                <Nav
                    navItems={this.props.navItems}
                    disabled={this.props.loadingPosts}
                    activePostsType={this.props.activePostsType}
                />
            </React.Fragment>
        );

    }
    PcLayout() {
        return (
            <Row>
                <Col width={100 / 960}>
                    <DaysFrom start="2017-11-18"/>
                </Col>
                <Col width={293 / 960}>
                    <header>
                        <BlogHeader {...this.props.config}/>
                    </header>
                    <Nav
                        navItems={this.props.navItems}
                        disabled={this.props.loadingPosts}
                        activePostsType={this.props.activePostsType}
                    />
                </Col>
                <Col width={280 / 960}>
                    <section data-loading={this.props.loadingPosts}>
                        {
                            !this.props.loadingPosts &&
                            this.props.posts.list &&
                            this.props.posts.list.map((post, index) =>
                                <Post {...post} key={index}/>
                            )
                        }
                    </section>
                    {(this.props.posts.prevPage || this.props.posts.nextPage) &&
                    <PageNav
                        {...this.props.posts}
                    />
                    }
                </Col>
                <Col width={276 / 960}/>
            </Row>
        );
    }

    render() {
        if (this.state.hasException) {
            return <ErrorPanel/>;
        }

        return (
            <div className="blog">
                {
                    Config.isMobile
                        ? <this.MobileLayout/>
                        : <this.PcLayout />
                }
            </div>
        );
    }
}

Blog.propTypes = {
    activePostsType: PropTypes.oneOfType([PropTypes.string, PropTypes.object]), // null, or string
    config: PropTypes.object.isRequired,
    navItems: PropTypes.array.isRequired,
};

export default connect(function (state, props) {
    return {
        ...props,
        ...state
    };
})(Blog);
