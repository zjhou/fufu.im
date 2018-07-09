import React from 'react';
import {Flex, Box} from 'grid-styled';
import PropTypes from 'prop-types';
import './style.scss';
import Nav from '../../static-com/Nav/Nav';
import {getBlogConfig, getNavItems, getPosts} from '../../../service/BlogApi';
import Post from '../../static-com/Post/Post';
import Spinner from '../../static-com/Spinner/Spinner';
import PageNav from '../../static-com/PageNav/PageNav';
import ErrorPanel from '../../static-com/ErrorBoundary/ErrorPanel';
import DaysFrom from '../../static-com/DaysFrom/DaysFrom';

const Head =
    (props) => {
        return (
            <div className="blog-header">
                <div>
                    <span className="blog-title high-light">
                        {props.title}
                    </span>
                </div>
                <div>
                    <span className="email high-light">
                        {props.email}
                    </span>
                </div>
            </div>
        );
    };

Head.propTypes = {
    title: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired
};
export default class Blog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            loadingPosts: true,
            blogConfig: {},
            navItems: [],
            activePostsType: props.activePostsType || '',
            posts: {},
            hasException: false,
            pagenow: 1,
        };
        this.loadPosts = this.loadPosts.bind(this);
        this.loadBlogAssets = this.loadBlogAssets.bind(this);
    }

    componentDidMount() {
        this.loadBlogAssets()
            .then(() => {
                return this.loadPosts(this.state.activePostsType, this.state.pagenow);
            })
            .catch((e) => {
                console.error(e);
                this.setState({hasException: true});
            });
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (nextState.blogConfig !== this.state.blogConfig)
            || (nextState.loading !== this.state.loading)
            || (nextState.loadingPosts !== this.state.loadingPosts)
            || (nextState.pagenow !== this.state.pagenow)
            || (nextState.hasException !== this.state.hasException)
            || (nextState.navItems !== this.state.navItems)
            || (nextProps !== this.props)
            || (nextState.activePostsType !== this.state.activePostsType)
            || (nextState.posts !== this.state.posts);
    }

    async loadBlogAssets() {
        let blogConfig = await getBlogConfig();
        let navItems = await getNavItems();
        this.setState({
            blogConfig: blogConfig,
            activePostsType: blogConfig.defaultType,
            navItems: navItems,
            loading: false,
        });
    }

    async loadPosts(type, pagenow) {
        this.setState({loadingPosts: true});
        let posts = await getPosts(type, pagenow);
        this.setState({
            loadingPosts: false,
            posts: posts
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.activePostsType !== prevState.activePostsType ||
            prevProps.activePostsType !== this.props.activePostsType
        ) {
            this.loadPosts(this.state.activePostsType, this.state.pagenow)
                .catch(e => {
                    console.error(e);
                    this.setState({loadingPosts: false});
                });
        }
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
                <header>
                    <Flex>
                        <Box width={100 / 960}/>
                        <Box width={860 / 960}>
                            <Head {...this.state.blogConfig}/>
                        </Box>
                    </Flex>
                </header>
                <main>
                    <Flex>
                        <Box width={100 / 960}>
                            <DaysFrom start="2017-11-18"/>
                        </Box>
                        <Box width={314 / 960}>
                            <Nav
                                navItems={this.state.navItems}
                                disabled={this.state.loadingPosts || this.state.loading}
                                activeType={this.state.activePostsType}
                                onChange={(type) => {
                                    this.setState({
                                        activePostsType: type,
                                        pagenow: 1
                                    });
                                }}
                            />
                        </Box>
                        <Box width={280 / 960}>
                            <section data-loading={this.state.loadingPosts}>
                                {
                                    !this.state.loadingPosts &&
                                    this.state.posts &&
                                    this.state.posts.list.map((post, index) =>
                                        <Post {...post} key={index}/>
                                    )
                                }
                            </section>
                            {(this.state.posts.prevPage || this.state.posts.nextPage) &&
                            <PageNav
                                {...this.state.posts}
                                onClick={async (pagenow) => {
                                    await this.loadPosts(this.state.activePostsType, pagenow);
                                    this.setState({pagenow: pagenow});
                                }}
                            />
                            }
                        </Box>
                        <Box width={276 / 960}/>
                    </Flex>
                </main>
            </div>
        );
    }
}

Blog.propTypes = {
    activePostsType: PropTypes.string
};
