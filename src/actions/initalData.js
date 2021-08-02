export const initalData = {
    board: [
        {
            id: 'board-1',
            columnOrder: ['column-1', 'column-2', 'column-3'],
            columns: [
                {
                    id: 'column-1',
                    boardId: 'board-1',
                    title: 'To do column',
                    cardOrder: ['card-1', 'card-2', 'card-3', 'card-4', 'card-5', 'card-6', 'card-7'],
                    cards: [
                        {
                            id: 'card-1',
                            boardId: 'board-1',
                            columnId: 'column-1',
                            title: 'Title of card 1',
                            cover: 'https://scontent.fhan5-2.fna.fbcdn.net/v/t1.6435-9/94541117_2709832912475906_8713513338115457024_n.jpg?_nc_cat=102&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=0oi2H1ZiKeAAX8QfKLa&_nc_ht=scontent.fhan5-2.fna&oh=e7ba0630a3795a137f0f08b1b223d5d5&oe=612CA2C4'
                        },
                        { id: 'card-2', boardId: 'board-1', columnId: 'column-1', title: 'Title of card 2', cover: null },
                        { id: 'card-3', boardId: 'board-1', columnId: 'column-1', title: 'Title of card 3', cover: null },
                        { id: 'card-4', boardId: 'board-1', columnId: 'column-1', title: 'Title of card 4', cover: null },
                        { id: 'card-5', boardId: 'board-1', columnId: 'column-1', title: 'Title of card 5', cover: null },
                        { id: 'card-6', boardId: 'board-1', columnId: 'column-1', title: 'Title of card 6', cover: null },
                        { id: 'card-7', boardId: 'board-1', columnId: 'column-1', title: 'Title of card 7', cover: null },

                    ]
                },
                {
                    id: 'column-2',
                    boardId: 'board-1',
                    title: 'Inprogress column',
                    cardOrder: ['card-8', 'card-9', 'card-10'],
                    cards: [
                        { id: 'card-8', boardId: 'board-1', columnId: 'column-2', title: 'Title of card 8', cover: null },
                        { id: 'card-9', boardId: 'board-1', columnId: 'column-2', title: 'Title of card 9', cover: null },
                        { id: 'card-10', boardId: 'board-1', columnId: 'column-2', title: 'Title of card 10', cover: null },

                    ]
                },
                {
                    id: 'column-3',
                    boardId: 'board-1',
                    title: 'Done Column ',
                    cardOrder: ['card-11', 'card-12', 'card-13', 'card-14'],
                    cards: [
                        { id: 'card-11', boardId: 'board-1', columnId: 'column-3', title: 'Title of card 11', cover: null },
                        { id: 'card-12', boardId: 'board-1', columnId: 'column-3', title: 'Title of card 12', cover: null },
                        { id: 'card-13', boardId: 'board-1', columnId: 'column-3', title: 'Title of card 13', cover: null },
                        { id: 'card-14', boardId: 'board-1', columnId: 'column-3', title: 'Title of card 14', cover: null },

                    ]
                }

            ]
        }
    ]
}