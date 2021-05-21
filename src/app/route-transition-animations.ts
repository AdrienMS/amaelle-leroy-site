import { trigger, transition, style, query, group, animate, animateChild } from '@angular/animations';

export const routeTransitionAnimations = trigger('triggerName', [
    transition('* <=> *', [
        group([
            // transition(':enter', [
            //     query(
            //         '.animate-screen',
            //         [
            //             style({
            //                 position: 'fixed',
            //                 left: 0,
            //                 right: 0,
            //                 top: '100%',
            //                 backgroundColor: 'pink',
            //                 height: '100%',
            //                 zIndex: 100
            //             }),
            //             animate(
            //                 '0.5s ease',
            //                 style({ top: 0 })
            //             )
            //         ]
            //     )
            // ]),
            query(
                ':enter',
                [
                    style({
                        position: 'fixed',
                        left: 0,
                        right: 0,
                        top: '100%',
                        backgroundColor: 'pink',
                        height: '100%',
                        zIndex: 100
                    }),
                    animate(
                        '0.5s ease',
                        style({ top: '-100%' })
                    )
                ],
                { optional: true }
            )
        ])
    ])
]);
