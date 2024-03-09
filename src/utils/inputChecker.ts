import {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
    FetchBaseQueryMeta,
    MutationDefinition
} from '@reduxjs/toolkit/query'
import {ICheckPresenceData} from "../interface/app.interface";
import {MutationTrigger} from "@reduxjs/toolkit/dist/query/react/buildHooks";

interface IProps {
    value: string,
    fieldName: string
    isValidLength: boolean
    isTested: boolean ,
    setIsState: (v: boolean) => void
    mutate: MutationTrigger<MutationDefinition<ICheckPresenceData, BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>, "api", boolean, "api">>
}

export const uniqueFieldChecker = async ({...props} : IProps) => {

    try {
        if (props.isValidLength && props.isTested) {

            const newData = {
                [props.fieldName]: props.value,
                endpoint: 'http://localhost:3000/',
            }

            const response = await props.mutate(newData)

            if ('data' in response) {
                props.setIsState(response.data)
            }

        } else {
            props.setIsState(false)
        }

    } catch (error) {
        console.error('Ошибка:', error);
    }
}