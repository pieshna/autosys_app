'use client'
import { Tab, Tabs, TabsProps } from '@nextui-org/react'
import { ReactNode } from 'react'

interface TabsCustomProps extends TabsProps {
  items: TabsChildrenProps[]
}

export interface TabsChildrenProps {
  child: ReactNode
  key?: string
  title: string
  icon?: ReactNode
}

function TabsCustom({ items, ...resto }: Omit<TabsCustomProps, 'children'>) {
  return (
    <>
      {items && (
        <Tabs {...resto}>
          {items.map((c) => (
            <Tab
              key={c.key ?? c.title}
              title={
                <div className="flex gap-2 items-center">
                  {c.icon}
                  {c.title}
                </div>
              }
            >
              {c.child}
            </Tab>
          ))}
        </Tabs>
      )}
    </>
  )
}

export default TabsCustom
