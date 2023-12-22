import React from 'react';
import Tag, {TagColors} from './Tag';
import styled from 'styled-components';


interface ISearchFilter {
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    setFilters: React.Dispatch<React.SetStateAction<string[]>>;
    filters: string[];
}

export default function SearchFilter(props: ISearchFilter) {
    const {setFilters, filters, setSearch} = props;

    const addFilter = (filter: string) => {
        if (!filters.includes(filter)) {
            setFilters([...filters, filter]);
        }
    };

    const removeFilter = (filter: string) => {
        setFilters(filters.filter((f) => f !== filter));
    };

    return <>
        {/* Use the new SearchFilterContainer to wrap the search and filter components */}
        <SearchFilterContainer>
            <StyledInput
                type="text"
                placeholder="Search..."
                onChange={(e) => setSearch(e.target.value)}
            />
            <FilterList filters={Object.keys(TagColors)} addFilter={addFilter}/>
        </SearchFilterContainer>

        {/* Show Filters in a row beneath Search and Filter List */}
        <FiltersContainer>
            {filters.map((filter) => (
                <Tag key={filter} name={filter.charAt(0).toUpperCase() + filter.slice(1)}
                     removeTag={() => removeFilter(filter)}/>
            ))}
        </FiltersContainer>
    </>
}


function FilterList(props: { filters: string[], addFilter: any }) {
    const {filters, addFilter} = props;

    return <StyledSelect onChange={(e) => {
        const value = e.target.value;
        if (value) {
            addFilter(value);
        }
    }}>
        <option value="">Select a Tag...</option>
        {filters.map((filter) => (
            <option key={filter} value={filter}>
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </option>
        ))}
    </StyledSelect>
}

const SearchFilterContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
    margin: 0 auto;

    & > * {
        font-size: 1rem;
    }

    @media (max-width: 768px) {
        flex-direction: column;
    }
`;

const StyledInput = styled.input`
    flex: 1;
    padding: 10px;
    margin-bottom: 10px;
    background: ${({theme}) => theme.colors.primary};
    color: ${({theme}) => theme.text.primary};
    border: none;
    border-radius: 5px;

    &:focus {
        outline: none;
    }

    &::placeholder {
        color: ${({theme}) => theme.text.primary};
    }
`;

const StyledSelect = styled.select`
    flex: 0.5;
    padding: 10px;
    background: ${({theme}) => theme.colors.primary};
    color: ${({theme}) => theme.text.primary};
    border: none;
    border-radius: 5px;
    margin-bottom: 10px;

    &:focus {
        outline: none;
    }

    & > * {
        background: ${({theme}) => theme.colors.background};
        color: ${({theme}) => theme.text.primary};
    }
`;

const FiltersContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin: 0 auto;
`;