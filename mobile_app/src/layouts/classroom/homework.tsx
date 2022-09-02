import React from 'react';
import { Props } from '@ui-kitten/components/devsupport/services/props/props.service';
import { ListRenderItemInfo, View } from 'react-native';
import { Avatar, Button, StyleService, useStyleSheet, Card, Layout, List, Text, Spinner, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { Article } from './extra/article';
import { baseUrl } from '../../services/config';
import { loadHomeworks, getFeeds } from '../../redux/Classroom/slice';
import { useSelector } from 'react-redux';

import moment from "moment";
import { ArrowIosBackIcon, AttatchmentIcon, MessageCircleIcon } from './extra/icons';
import { SafeAreaLayout } from '../../components/safe-area-layout.component';



export const HomeworkScreen = ({ route, navigation }: Props): React.ReactElement => {

    const { homeworks } = useSelector(getFeeds)

    const styles = useStyleSheet(themedStyle);

    const renderItemFooter = (info: ListRenderItemInfo<Article>): React.ReactElement => (
        <View style={styles.itemFooter}>
            <Avatar source={info.item.userId.avatar ? { uri: baseUrl.concat("/v1/media/attatchment/").concat(info.item.userId.avatar) } : require('./assets/image-profile.jpeg')} />
            <View style={styles.itemAuthoringContainer}>
                <Text
                    category='s2'>
                    {info.item.userId.name}
                </Text>
                <Text
                    appearance='hint'
                    category='c1'>
                    {moment(info.item.updatedAt).format("DD-MM HH:mm")}
                </Text>
            </View>
            {info.item.comments.length > 0 && <Button
                style={styles.iconButton}
                appearance='ghost'
                status='basic'
                accessoryLeft={MessageCircleIcon}>
                {info.item.comments.length || 0}
            </Button>}
            {info.item.attatchments.length > 0 && <Button
                style={styles.iconButton}
                appearance='ghost'
                accessoryLeft={AttatchmentIcon}>
                {info.item.attatchments.length || 0}
            </Button>}
        </View>
    );

    const onItemPress = (feed: any): void => {
        navigation && navigation.navigate('ArticleDetail', { classroom: route.params.data, feed: feed.item });
    };

    const renderItem = (info: ListRenderItemInfo<Article>): React.ReactElement => (
        <Card
            style={styles.item}
            footer={() => renderItemFooter(info)}
            onPress={() => onItemPress(info)}>
            <Text style={styles.feedTextTitle}>
                {info.item.title}
            </Text>
            <Text
                style={styles.itemContent}
                appearance='hint'
                category='s1'>
                {`${info.item.content.substring(0, 82)}...`}
            </Text>
        </Card>
    );
    const renderBackAction = (): React.ReactElement => (
        <TopNavigationAction
            icon={ArrowIosBackIcon}
            alignment="center"
            onPress={navigation.goBack}
        />
    );

    const renderRightAction = (): React.ReactElement => (
        <Button
            onPress={addNewFeedACtion} 
            size='small'>
            Thêm bài tập
        </Button>
    );

    const addNewFeedACtion = (): void => {
        navigation && navigation.navigate('AddFeed', { classroom: route.params.data, type: "homework" });
    }

    return (
        <SafeAreaLayout
            style={styles.container}
            insets='top'>
            <TopNavigation
                title="Bài tập"
                accessoryLeft={renderBackAction}
                accessoryRight={renderRightAction}
            />
            <List
                style={styles.list}
                contentContainerStyle={styles.listContent}
                data={homeworks}
                renderItem={renderItem}
            />
        </SafeAreaLayout>
    )


}

const themedStyle = StyleService.create({
    container: {
        flex: 1,
        backgroundColor: 'background-basic-color-2',
    },
    header: {
        paddingVertical: 24,
        alignItems: 'center',
    },
    profileAvatar: {
        width: 124,
        height: 124,
        borderRadius: 62,
        marginVertical: 16,
    },
    profileName: {
        zIndex: 1,
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    location: {
        marginVertical: 8,
    },
    profileButtonsContainer: {
        flexDirection: 'row',
        marginVertical: 32,
        marginHorizontal: 20,
    },
    profileButton: {
        flex: 1,
        marginHorizontal: 4,
    },
    socialsContainer: {
        flexDirection: 'row',
        width: '75%',
        marginVertical: 8,
    },
    profileSocial: {
        flex: 1,
    },
    sectionLabel: {
        marginTop: 24,
        marginBottom: 8,
        marginHorizontal: 16,
    },
    profileDescription: {
        marginHorizontal: 16,
    },
    friendsList: {
        marginHorizontal: 8,
    },
    friendItem: {
        alignItems: 'center',
        marginHorizontal: 8,
    },
    friendName: {
        marginTop: 8,
    },
    postItem: {
        flex: 1,
        aspectRatio: 1.0,
    },
    list: {
        flex: 1,
    },
    listContent: {
        paddingHorizontal: 8,
        paddingVertical: 8,
    },
    item: {
        marginVertical: 8,
    },
    itemHeader: {
        height: 220,
    },
    itemContent: {
        marginVertical: 8,
    },
    itemFooter: {
        flexDirection: 'row',
        padding: 5
    },
    shareNewsFeed: {
        marginLeft: 8,
        marginRight: 8,
    },
    iconButton: {
        paddingHorizontal: 0,
    },
    itemAuthoringContainer: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 16,
    },
    loadingFeeds: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    feedTextTitle: {
        fontSize: 16
    },
    addNewFeed: {
        flex: 1
    }
})