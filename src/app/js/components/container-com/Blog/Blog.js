import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import Nav from '../../static-com/Nav/Nav';
import {getPosts} from '../../../service/BlogApi';
import Post from '../../static-com/Post/Post';
import BlogHeader from '../../static-com/BlogHeader/BlogHerder';
import Spinner from '../../static-com/Spinner/Spinner';
import PageNav from '../../static-com/PageNav/PageNav';
import ErrorPanel from '../../static-com/ErrorBoundary/ErrorPanel';
import DaysFrom from '../../static-com/DaysFrom/DaysFrom';
import {Row, Col} from '../../static-com/Layout/Layout';
import Config from '../../../../../config/blog.config';
import {connect} from 'react-redux';

class Blog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loadingPosts: false,
            posts: {},
            hasException: false,
        };
        this.loadPosts = this.loadPosts.bind(this);
        this.PcLayout = this.PcLayout.bind(this);
        this.MobileLayout = this.MobileLayout.bind(this);
    }

    componentDidMount() {
        return this.loadPosts(this.props.activePostsType, this.props.pagenow);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (nextState.loading !== this.state.loading)
            || (nextState.loadingPosts !== this.state.loadingPosts)
            || (nextState.hasException !== this.state.hasException)
            || (nextProps !== this.props)
            || (nextProps.activePostsType !== this.props.activePostsType)
            || (nextProps.pagenow !== this.props.pagenow)
            || (nextState.posts !== this.state.posts);
    }

    async loadPosts(type, pagenow) {
        if(!type){return;}
        if(Config.isMobile){
            this.postsWrapper.scrollTop = 0;
        }else{
            scrollTo(0,-1);
        }
        this.setState({loadingPosts: true});
        let posts = await getPosts(type, pagenow, this.state.posts.nextPage);
        setTimeout(() => {
            this.setState({
                loadingPosts: false,
                posts: posts
            });
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
                    this.setState({loadingPosts: false});
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
                <section data-loading={this.state.loadingPosts}
                    ref={posts => this.postsWrapper = posts}
                >
                    {
                        !this.state.loadingPosts &&
                        this.state.posts.list &&
                        this.state.posts.list.map((post, index) =>
                            <Post {...post} key={index}/>
                        )
                    }
                    {
                        !this.state.loadingPosts &&
                        (this.state.posts.prevPage || this.state.posts.nextPage) &&
                    <PageNav
                        {...this.state.posts}
                    />
                    }
                </section>
                <Nav
                    navItems={this.props.navItems}
                    disabled={this.state.loadingPosts || this.state.loading}
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
                        disabled={this.state.loadingPosts || this.state.loading}
                        activeType={this.state.activePostsType}
                    />
                </Col>
                <Col width={280 / 960}>
                    <section data-loading={this.state.loadingPosts}>
                        {
                            !this.state.loadingPosts &&
                            this.state.posts.list &&
                            this.state.posts.list.map((post, index) =>
                                <Post {...post} key={index}/>
                            )
                        }
                    </section>
                    {(this.state.posts.prevPage || this.state.posts.nextPage) &&
                    <PageNav
                        {...this.state.posts}
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
        if (this.state.loading) {
            return <Spinner/>;
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
