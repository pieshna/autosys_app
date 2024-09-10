import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider
} from '@nextui-org/react'

interface CardsCustomProps {
  header?: React.ReactNode
  children: React.ReactNode
  footer?: React.ReactNode
}

function CardsCustom({ header, children, footer }: CardsCustomProps) {
  return (
    <>
      <Card>
        <CardHeader>{header}</CardHeader>
        <Divider />
        <CardBody>{children}</CardBody>
        <CardFooter>{footer}</CardFooter>
      </Card>
    </>
  )
}

export default CardsCustom
