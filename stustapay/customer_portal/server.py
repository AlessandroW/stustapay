import logging
from stustapay.core.config import Config

from stustapay.core.http.context import Context
from stustapay.core.http.server import Server
from stustapay.core.service.config import ConfigService
from stustapay.core.service.customer import CustomerService
from stustapay.core.service.user import AuthService
from stustapay.core.subcommand import SubCommand
from stustapay.customer_portal.routers import base
from .routers import auth


class Api(SubCommand):
    def __init__(self, args, config: Config, **rest):
        del args, rest  # unused

        self.cfg = config
        self.dbpool = None

        self.logger = logging.getLogger(__name__)

        self.server = Server(
            title="StuStaPay Customer Portal API",
            config=config.customer_portal,
            cors=True,
        )

        self.server.add_router(auth.router)
        self.server.add_router(base.router)

    async def run(self):
        db_pool = await self.server.db_connect(self.cfg.database)

        auth_service = AuthService(db_pool=db_pool, config=self.cfg)
        config_service = ConfigService(db_pool=db_pool, config=self.cfg, auth_service=auth_service)

        context = Context(
            config=self.cfg,
            db_pool=db_pool,
            config_service=ConfigService(db_pool=db_pool, config=self.cfg, auth_service=auth_service),
            customer_service=CustomerService(
                db_pool=db_pool, config=self.cfg, auth_service=auth_service, config_service=config_service
            ),
        )
        try:
            await self.server.run(self.cfg, context)
        finally:
            await db_pool.close()
