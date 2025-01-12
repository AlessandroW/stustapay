from fastapi import APIRouter, status, HTTPException

from stustapay.core.http.auth_till import CurrentAuthToken
from stustapay.core.http.context import ContextTillService, ContextAccountService
from stustapay.core.schema.customer import Customer
from stustapay.core.util import BaseModel

router = APIRouter(
    prefix="/customer",
    tags=["customer"],
    responses={404: {"description": "Not found"}},
)


class SwitchTagPayload(BaseModel):
    customer_id: int
    new_user_tag_uid: int


@router.post("/switch_tag", summary="")
async def switch_tag(
    token: CurrentAuthToken,
    payload: SwitchTagPayload,
    account_service: ContextAccountService,
):
    success = await account_service.switch_account_tag_uid_terminal(
        token=token, account_id=payload.customer_id, new_user_tag_uid=payload.new_user_tag_uid
    )
    if not success:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST)


@router.get("/{customer_tag_uid}", summary="Obtain a customer by tag uid", response_model=Customer)
async def get_customer(
    token: CurrentAuthToken,
    customer_tag_uid: int,
    till_service: ContextTillService,
):
    customer = await till_service.get_customer(token=token, customer_tag_uid=customer_tag_uid)
    if customer is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
    return customer
