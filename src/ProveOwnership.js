import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import Money from "@yosmy/money";
import {withTheme} from "@yosmy/style";
import {Container, EmptyLayout, Error, Input, PrimaryButton, SecondaryButton, SecondaryText, TertiaryButton, Text} from "@yosmy/ui";
import {CardProp} from "@yosmy/payment";

const ProveOwnership = React.memo(({
    theme, ui, api, card, onProve
}) => {
    const [amount, setAmount] = useState(null);
    const [help, setHelp] = useState(false);
    const [proved, setProved] = useState(false);

    const [execution, setExecution] = useState({
        failure: null,
        error: null,
        progress: false
    });

    useEffect(() => {
        setExecution({
            failure: null,
            error: null,
            progress: true
        });

        api.card.initOwnership(
            card.id,
            // onReturn
            () => {
                setExecution({
                    failure: false,
                    error: null,
                    progress: false
                });
            },
            // onException
            ({message}) => {
                setExecution({
                    failure: message,
                    error: null,
                    progress: false
                });
            }
        )
    }, []);

    if (execution.failure === null) {
        return <ui.layout
            progress={execution.progress}
        />
    }

    if (execution.failure !== false) {
        return <ui.layout
            progress={execution.progress}
        >
            <Error>
                {`Ocurrió un error con tu tarjeta:\n`}
                {execution.failure}
            </Error>
        </ui.layout>
    }

    if (proved === true) {
        return <ui.layout
            padding={{
                top: 2,
                bottom: 0,
                left: 0,
                right: 0
            }}
        >
            <ui.icons.states.ok size={40} />
            <Text
                align={{
                    self: "center"
                }}
                margin={{
                    top: 2
                }}
            >
                Tu tarjeta terminada en {card.last4} ha sido verificada correctamente.
            </Text>
            <TertiaryButton
                align={{
                    self: 'stretch'
                }}
                margin={{
                    top: 2
                }}
                padding={2}
                border={{
                    color: theme.divider.border.color,
                    top: {
                        width: theme.divider.border.width
                    }
                }}
                onClick={() => {
                    onProve();
                }}
            >
                <Text>Cerrar</Text>
            </TertiaryButton>
        </ui.layout>
    }

    return <ui.layout
        progress={execution.progress}
    >
        <Container>
            <Text
                align={{
                    self: "flex-start"
                }}
                wrap
            >
                Revisa la cuenta de banco de tu tarjeta terminada en {card.last4}.
            </Text>
            <Text
                align={{
                    self: "flex-start"
                }}
                wrap
                margin={{
                    top: 2
                }}
            >
                Escribe la cantidad exacta de un nuevo cobro que te hemos hecho.
            </Text>
        </Container>

        <Input
            value={amount}
            keyboard="decimal"
            placeholder="Escribe el cobro"
            width={150}
            margin={{
                top: 2
            }}
            onChange={(value) => {
                setAmount(value);
            }}
        />

        {execution.error && <Error
            margin={{
                top: 2
            }}
        >
            {execution.error}
        </Error>}

        <PrimaryButton
            progress={execution.progress}
            disabled={execution.progress}
            margin={{
                top: 2
            }}
            onClick={() => {
                if (!amount) {
                    setExecution((prev) => {
                        return {
                            ...prev,
                            error: "Escribe la nueva cantidad que te cobramos a tu tarjeta",
                        }
                    });

                    return;
                }

                setExecution({
                    failure: false,
                    error: null,
                    progress: true
                });

                api.card.proveOwnership(
                    card.id,
                    Money.normalize(amount),
                    // onReturn
                    () => {
                        setProved(true);
                    },
                    // onException
                    ({message}) => {
                        setExecution({
                            failure: false,
                            error: message,
                            progress: false
                        });
                    }
                );
            }}
        >
            <Text>Verificar</Text>
        </PrimaryButton>

        {!help && <SecondaryButton
            margin={{
                top: 2
            }}
            onClick={() => {
                setHelp((prev) => {
                    return !prev
                });
            }}
        >
            <Text>¿Por qué es este cobro?</Text>
        </SecondaryButton>}

        {help && <EmptyLayout>
            <SecondaryText
                align={{
                    self: "flex-start"
                }}
                margin={{
                    top: 2
                }}
            >
                Haciendo este cobro y pidiéndote que busques en tu cuenta de banco la cantidad exacta, nos aseguramos que la tarjeta es realmente tuya y no es alguien que te robó los datos.
            </SecondaryText>
            <SecondaryText
                align={{
                    self: "flex-start"
                }}
                margin={{
                    top: 2
                }}
            >
                Al terminar la comprobación, te devolveremos este cobro a la misma tarjeta y podrás seguir usándola.
            </SecondaryText>
            <SecondaryText
                align={{
                    self: "flex-start"
                }}
                margin={{
                    top: 2
                }}
            >
                Este proceso se realiza una sola vez para cada tarjeta que agregues.
            </SecondaryText>
            <SecondaryButton
                margin={{
                    top: 2
                }}
                onClick={() => {
                    setHelp((prev) => {
                        return !prev
                    });
                }}
            >
                <Text>Ok</Text>
            </SecondaryButton>
        </EmptyLayout>}
    </ui.layout>
}, () => {
    return true;
});

ProveOwnership.propTypes = {
    ui: PropTypes.shape({
        layout: PropTypes.func.isRequired,
        icons: PropTypes.shape({
            states: PropTypes.shape({
                ok: PropTypes.func.isRequired
            }).isRequired
        }).isRequired
    }).isRequired,
    api: PropTypes.shape({
        card: PropTypes.shape({
            initOwnership: PropTypes.func.isRequired,
            proveOwnership: PropTypes.func.isRequired
        })
    }).isRequired,
    card: CardProp,
    onProve: PropTypes.func.isRequired // ()
};

export default withTheme(ProveOwnership);