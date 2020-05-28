import React from 'react';
import {ThemeProvider} from "@yosmy/style";
import {EmptyLayout} from "@yosmy/ui";
import theme from "../Theme";

import BackendManageOwnership from '../BackendManageOwnership';

export default {
  title: 'BackendManageOwnership',
  component: BackendManageOwnership,
};

const defaultApi = {
    card: {
        approveOwnership: (card, user, reason, onReturn) => {
            onReturn({
                card: "card-1",
                proved: true
            });
        }
    }
};

const Template = ({api}) => {
    return <ThemeProvider theme={theme}>
        <BackendManageOwnership
            ui={{
                layout: EmptyLayout,
            }}
            api={{
                ...defaultApi,
                ...api,
                card: {
                    ...defaultApi.card,
                    ...api.card
                }
            }}
            card="card-1"
            user="user-1"
        />
    </ThemeProvider>
};

export const Proved = Template.bind({});
Proved.args = {
    api: {
        card: {
            pickOwnership: (card, user, onReturn) => {
                onReturn({
                    card: "card-1",
                    proved: true,
                });
            }
        }
    }
};

export const NotProved = Template.bind({});
NotProved.args = {
    api: {
        card: {
            pickOwnership: (card, user, onReturn) => {
                onReturn({
                    card: "card-1",
                    proved: false,
                });
            }
        }
    }
};
